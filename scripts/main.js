document.body.onload = _ => {
    const input = document.getElementsByTagName(`input`)[0];
    const secs = document.getElementsByTagName(`output`)[0];
    input.addEventListener(`change`, ev => {
        const now = new Date();
        const then = new Date(input.value);
        secs.value = (~~[(now - then) / 1000]).toLocaleString();
        if (typeof counter != `undefined`) clearInterval(counter);
        counter = setInterval(_ => {
            const now = new Date();
            secs.value = (~~[(now - then) / 1000]).toLocaleString();
        }, 1000);
    });
};