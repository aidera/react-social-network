import anime from "animejs";

const hide = (target, cb) => {
    anime({
        targets: target,
        keyframes: [
            {opacity: 1},
            {opacity: 0}
        ],
        duration: 300,
        easing: 'linear',
        loop: false,
        complete: () => {
            if(cb) cb()
        }
    });
};

export default hide;