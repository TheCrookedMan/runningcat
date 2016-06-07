let cache = Object.create(null);
let debug = false;
let hitCount = 0;
let missCount = 0;
let size = 0;

exports.put = (key, value, time, timeoutCallback) => {
    if (debug) {
        console.log('caching: %s = %j (@%s)', key, value, time);
    }
    let oldRecord = cache[key];
    if (oldRecord) {
        clearTimeout(oldRecord.timeout);
    } else {
        size++;
    }

    let expire = time + Date.now();
    let record = {
        value: value,
        expire: expire
    };

    if (!isNaN(expire)) {
        let timeout = setTimeout(() => {
            exports.del(key);
            if (typeof timeoutCallback === 'function') {
                timeoutCallback(key);
            }
        }, time);
        record.timeout = timeout;
    }

    cache[key] = record;
};

exports.del = (key) => {
    let canDelete = true;

    let oldRecord = cache[key];
    if (oldRecord) {
        clearTimeout(oldRecord.timeout);
        if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
            canDelete = false;
        }
    } else {
        canDelete = false;
    }

    if (canDelete) {
        size--;
        delete cache[key];
    }

    return canDelete;
};

exports.clear = () => {
    for (let key in cache) {
        let oldRecord = cache[key];
        if (oldRecord) {
            clearTimeout(oldRecord.timeout);
        }
    }
    size = 0;
    cache = Object.create(null);
    if (debug) {
        hitCount = 0;
        missCount = 0;
    }
};

exports.get = (key) => {
    let data = cache[key];
    if (typeof data != "undefined") {
        if (isNaN(data.expire) || data.expire >= Date.now()) {
            if (debug) hitCount++;
            return data.value;
        } else {
            // free some space
            if (debug) missCount++;
            size--;
            //delete cache[key];
            return data.value;
        }
    } else if (debug) {
        missCount++;
    }
    return null;
};

exports.size = () => {
    return size;
};

exports.memsize = () => {
    let size = 0,
        key;
    for (key in cache) {
        size++;
    }
    return size;
};

exports.debug = (bool) => {
    debug = bool;
};

exports.hits = () => {
    return hitCount;
};

exports.misses = () => {
    return missCount;
};

exports.keys = () => {
    return Object.keys(cache);
};
