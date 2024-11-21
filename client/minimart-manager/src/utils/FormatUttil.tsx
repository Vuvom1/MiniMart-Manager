class FormatUtil {
    static moneyFormat = (inputValue: string) => {
       
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const parts = inputValue.split('.');
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts.slice(1).join('').slice(0, 2);
    } else if (parts.length === 2 && parts[1].length > 2) {
      inputValue = parts[0] + '.' + parts[1].slice(0, 2);
    }

    const [integerPart, decimalPart] = inputValue.split('.');
    const formattedIntegerPart = parseInt(integerPart, 10)
      .toLocaleString(); 
    const formattedValue = decimalPart 
      ? `${formattedIntegerPart}.${decimalPart}` 
      : formattedIntegerPart;

      return formattedValue;
    };
}

export default FormatUtil;