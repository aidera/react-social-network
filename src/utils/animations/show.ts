import anime from "animejs";

const show = (target: HTMLElement, cb?: () => void) => {
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