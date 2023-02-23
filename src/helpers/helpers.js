export function getNameInitials(name) {

    const splitName = name.toUpperCase().split(" ")

    if (splitName > 1) {
        return splitName[0][0] + splitName[1][0]
    }
    return splitName[0][0]

}
