import anime from "animejs";

const show = (target, cb) => {
    anime({
        targets: target,
        keyframes: [
            {opacity: 0},
            {opacity: 1}
        ],
        duration: 300,
        easing: 'linear',
        loop: false,
        complete: () => {
            if(cb) cb()
        }
    });
};

export default show;