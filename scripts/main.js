document.body.onload = _ => {
    let then;
    const input = document.getElementsByTagName(`input`)[0];
    const outputs = document.getElementsByTagName(`output`);
    const now_box = document.getElementById(`now`);
    
    divisors = [1, 60, 3600, 86400, 604800, 2624832, 31557600]
    milestones = [~~5e8, ~~1e9, ~~2e9];
    input.addEventListener(`change`, ev => {
        const now = new Date();
        now_box.textContent = now;
        then = new Date(input.value);
        set_values(then, now);
        if (typeof counter != `undefined`) clearInterval(counter);
        counter = setInterval(_ => {
            const now = new Date();
            set_values(then, now);
        }, 1000);
    });

    function set_values(t0, t1) {
        const secs = ~~[(t1 - t0) / 1000];
        now_box.textContent = new Date();
        for (let i = 0; i < 7; i++) {
            outputs[i].value = (~~(secs / divisors[i])).toLocaleString();
        }
    }
};