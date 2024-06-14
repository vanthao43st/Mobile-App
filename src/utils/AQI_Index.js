const AQIBreakpoints = {
    o3: [
        { lo: 0, hi: 107, ilo: 0, ihi: 50 },
        { lo: 108, hi: 140, ilo: 51, ihi: 100 },
        { lo: 141, hi: 174, ilo: 101, ihi: 150 },
        { lo: 175, hi: 209, ilo: 151, ihi: 200 },
        { lo: 210, hi: 414, ilo: 201, ihi: 300 },
        { lo: 415, hi: 1000, ilo: 301, ihi: 500 }
    ],
    pm25: [
        { lo: 0, hi: 12, ilo: 0, ihi: 50 },
        { lo: 12.1, hi: 35.4, ilo: 51, ihi: 100 },
        { lo: 35.5, hi: 55.4, ilo: 101, ihi: 150 },
        { lo: 55.5, hi: 150.4, ilo: 151, ihi: 200 },
        { lo: 150.5, hi: 250.4, ilo: 201, ihi: 300 },
        { lo: 250.5, hi: 500.4, ilo: 301, ihi: 500 }
    ],
    pm10: [
        { lo: 0, hi: 54, ilo: 0, ihi: 50 },
        { lo: 55, hi: 154, ilo: 51, ihi: 100 },
        { lo: 155, hi: 254, ilo: 101, ihi: 150 },
        { lo: 255, hi: 354, ilo: 151, ihi: 200 },
        { lo: 355, hi: 424, ilo: 201, ihi: 300 },
        { lo: 425, hi: 604, ilo: 301, ihi: 500 }
    ],
    co: [
        { lo: 0, hi: 5000, ilo: 0, ihi: 50 }, // 0-5.0 mg/m³ -> 0-5000 µg/m³
        { lo: 5001, hi: 10000, ilo: 51, ihi: 100 }, // 5.1-10.0 mg/m³ -> 5001-10000 µg/m³
        { lo: 10001, hi: 15000, ilo: 101, ihi: 150 }, // 10.1-15.0 mg/m³ -> 10001-15000 µg/m³
        { lo: 15001, hi: 30000, ilo: 151, ihi: 200 }, // 15.1-30.0 mg/m³ -> 15001-30000 µg/m³
        { lo: 30001, hi: 40000, ilo: 201, ihi: 300 }, // 30.1-40.0 mg/m³ -> 30001-40000 µg/m³
        { lo: 40001, hi: 50000, ilo: 301, ihi: 500 } // 40.1-50.0 mg/m³ -> 40001-50000 µg/m³
    ],
    so2: [
        { lo: 0, hi: 35, ilo: 0, ihi: 50 },
        { lo: 36, hi: 75, ilo: 51, ihi: 100 },
        { lo: 76, hi: 185, ilo: 101, ihi: 150 },
        { lo: 186, hi: 304, ilo: 151, ihi: 200 },
        { lo: 305, hi: 604, ilo: 201, ihi: 300 },
        { lo: 605, hi: 1004, ilo: 301, ihi: 500 }
    ],
    no2: [
        { lo: 0, hi: 53, ilo: 0, ihi: 50 },
        { lo: 54, hi: 100, ilo: 51, ihi: 100 },
        { lo: 101, hi: 360, ilo: 101, ihi: 150 },
        { lo: 361, hi: 649, ilo: 151, ihi: 200 },
        { lo: 650, hi: 1249, ilo: 201, ihi: 300 },
        { lo: 1250, hi: 2049, ilo: 301, ihi: 500 }
    ]
};

const calculateAQI = (concentration, breakpoints) => {
    for (let i = 0; i < breakpoints.length; i++) {
        const { lo, hi, ilo, ihi } = breakpoints[i];
        if (concentration >= lo && concentration <= hi) {
            const aqi = ((ihi - ilo) / (hi - lo)) * (concentration - lo) + ilo;
            return Math.round(aqi);
        }
    }
    return -1; // Trả về -1 nếu không có giá trị phù hợp
};

const convertUnits = (data) => {
    // console.log(data)
    return {
        pm25: data.pm2_5, // µg/m³
        pm10: data.pm10, // µg/m³
        so2: data.so2, // µg/m³
        no2: data.no2, // µg/m³
        o3: data.o3, // µg/m³
        co: data.co * 1.145 * 1000 // ppm to µg/m³
    };
};

export const getAQIForAllPollutants = (data) => {
    const { o3, pm25, pm10, co, so2, no2 } = convertUnits(data);
    const o3AQI = o3 >= 0 ? calculateAQI(o3, AQIBreakpoints.o3) : -1;
    const pm25AQI = pm25 >= 0 ? calculateAQI(pm25, AQIBreakpoints.pm25) : -1;
    const pm10AQI = pm10 >= 0 ? calculateAQI(pm10, AQIBreakpoints.pm10) : -1;
    const coAQI = co >= 0 ? calculateAQI(co, AQIBreakpoints.co) : -1;
    const so2AQI = so2 >= 0 ? calculateAQI(so2, AQIBreakpoints.so2) : -1;
    const no2AQI = no2 >= 0 ? calculateAQI(no2, AQIBreakpoints.no2) : -1;

    return {
        o3: o3AQI,
        pm25: pm25AQI,
        pm10: pm10AQI,
        co: coAQI,
        so2: so2AQI,
        no2: no2AQI
    };
};

export const getOverallAQI = (aqiValues) => {
    const { o3, pm25, pm10, co, so2, no2 } = aqiValues;
    return Math.max(o3, pm25, pm10, co, so2, no2);
};

export const getAQIColor = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return 'green';
    if (aqi >= 51 && aqi <= 100) return '#e8cc02';
    if (aqi >= 101 && aqi <= 150) return 'orange';
    if (aqi >= 151 && aqi <= 200) return 'red';
    if (aqi >= 201 && aqi <= 300) return 'purple';
    if (aqi >= 301 && aqi <= 500) return 'maroon';
    return 'grey'; // Default color for invalid AQI
};

export const getAQILevel = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return 'Good';
    if (aqi >= 51 && aqi <= 100) return 'Moderate';
    if (aqi >= 101 && aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi >= 151 && aqi <= 200) return 'Unhealthy';
    if (aqi >= 201 && aqi <= 300) return 'Very Unhealthy';
    if (aqi >= 301 && aqi <= 500) return 'Hazardous';
    return 'Unknown'; // Default level for invalid AQI
};