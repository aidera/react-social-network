export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item;
    })
}

export const getPropertyInObject = function (propertyName, obj) {
    return obj[propertyName];
};