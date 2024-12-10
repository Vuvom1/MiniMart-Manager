import { tailwindColorMap } from "../constant/mapping";

export class ColorUtil {
    getStrongerColor = (bgColor: string): string => {
        const [color, shade] = bgColor.split('-');
        
        const shadeNumber = parseInt(shade, 10);
        
        if (isNaN(shadeNumber)) return bgColor; 
        
        const shadeRanges: { [key: string]: number[] } = {
            'red': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            'blue': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            'green': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            'yellow': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            'gray': [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
        };
        
        if (shadeRanges[color]) {
            const shades = shadeRanges[color];
            const currentShadeIndex = shades.indexOf(shadeNumber);
            
            if (currentShadeIndex === -1 || currentShadeIndex === shades.length - 1) {
                return bgColor;
            }
            
            const nextShade = shades[currentShadeIndex + 3];
            return `${color}-${nextShade}`;
        }
        
        return bgColor;
    };
    

}