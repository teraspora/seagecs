document.body.onload = _ => {
    let then;
    const input = document.getElementsByTagName(`input`)[0];
    const outputs = document.getElementsByTagName(`output`);
    const now_box = document.getElementById(`now`);
    flatpickr(`#datob`, {});
    divisors = [1, 60, 3600, 86400, 604800, 2624832, 31557600]
    milestones = [~~5e8, ~~1e9, ~~2e9];
    dtadd = (dt, secs) => {
        dtc = new Date(dt);
        dtc.setSeconds(dtc.getSeconds() + secs);
        return dtc;
    };
    input.addEventListener(`change`, ev => {
        const now = new Date();
        now_box.textContent = now.toString().slice(0, -30);
        
        // .toISOString().slice(0, -5).replace(`T`, ` `);
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
        now_box.textContent = new Date().toString().slice(0, -30);
        for (let i = 0; i < 10; i++) {
            outputs[i].value = i < 7 ? (~~(secs / divisors[i])).toLocaleString() : dtadd(t0, milestones[i - 7]).toString().slice(0, -30);
        }
    }
};
