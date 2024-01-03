
export const Time = (() => {

    async function Delay(time, data) {
        await new Promise(resolve => setTimeout(resolve, time));
        if(data) return data;
    };

    const throttleInProgress = {}; 
    const Throttle = (time, id) => {
        if(throttleInProgress[id] === true) {
            return false;
        }
        throttleInProgress[id] = true;
        return new Promise(resolve => {
            setTimeout(function() {
                throttleInProgress[id] = false;
                resolve();
            }, time)
        });
    };
    
    const debounceInProgress = {}; 
    const Debounce = (time, id) => {
        if(debounceInProgress[id]) {
            clearTimeout(debounceInProgress[id]);
        }
        return new Promise(resolve => {
            debounceInProgress[id] = setTimeout(function() {
                resolve();
            }, time)
        });
    };

    const DateObj = method => {
        const date = new Date();
        if(typeof method !== 'string' || method === '') {
            return date;
        } else {
            if(typeof date[method] === 'function') {
                return date[method](); 
            } else {
                console.warn(`'${method}' is not a Date method`)
            }
        }        
    };

    return {
        Delay,
        DateObj,
        Throttle,
        Debounce
    };

})();

export const __Throttle = (time, id) => [
    ['effect', {
        name: Time.Throttle,
        args: [time, id]
    }],
    inProgress => 
        ['control', {
            if: inProgress !== false,
            break: true
        }]
];

export const Debounce = (time, id) => [
    'effect', {
        name: Time.Debounce,
        args: [time, id]
    }
];

export const Delay = (time, data) => [
    'effect', {
        name: Time.Delay,
        args: [time, data]
    }
];

export const DateObj = method => [
    'effect', {
        name: Time.DateObj,
        args: [method]
    }
];

export const LocalTime = () => [
    'effect', {
        name: Time.DateObj,
        args: ['toLocaleTimeString']
    }
];