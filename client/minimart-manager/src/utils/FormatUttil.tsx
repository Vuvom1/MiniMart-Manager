class FormatUtil {
    static moneyParse(value: string) {
        return parseFloat(value.replace(/,/g, ''));
    }
}

export default FormatUtil;