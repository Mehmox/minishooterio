function normalizeToArray(value) {
    return Array.isArray(value) ? value : [value];
}

module.exports = function addEntityId(object, key, value) {

    if (object[key]) {

        object[key] = [...object[key], ...normalizeToArray(value)];

    } else {

        object[key] = normalizeToArray(value);

    }

}