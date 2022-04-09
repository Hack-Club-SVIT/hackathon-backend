const utils = {
    formatter: function humanize(str: string) {
        return str.trim().replace(/ /g, "_").toLocaleUpperCase();
    },
};

export default utils;
