document.body.onload = _ => {
    let then;
    const input = document.getElementsByTagName(`input`)[0];
    const outputs = document.getElementsByTagName(`output`);
    const now_box = document.getElementById(`now`);
    flatpickr(`#datob`, {enableTime: true});
    divisors = [1, 60, 3600, 86400, 604800, 2624832, 31557600]
    milestones = [5e8, 1e9, 15e8, 2e9, 6e8, 9e8, 18e8, 864e6, 72e7];
    dtadd = (dt, secs) => {
        dtc = new Date(dt);
        dtc.setSeconds(dtc.getSeconds() + secs);
        return dtc;
    };
    input.addEventListener(`change`, ev => {
        const now = new Date();
        now_box.textContent = get_rid_of_shit(now);
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
        now_box.textContent = get_rid_of_shit(new Date());
        for (const [i, val] of [...outputs].entries()) {
            val.value = i < 7 ? (~~(secs / divisors[i])).toLocaleString() : get_rid_of_shit(dtadd(t0, milestones[i - 7]));
        }
    }

    function get_rid_of_shit(ridiculously_long_date_string_object) {
        return ridiculously_long_date_string_object.toString().slice(0, -30);
    }
};

