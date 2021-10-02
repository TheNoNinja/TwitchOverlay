<script>
    export let Href;

    const OnClick = () => {
        if (Href === undefined) return;
        if (window.api === undefined) {
            window.open(Href);
            return;
        }
        window.api.send("open-link", Href);
    }
</script>

<span on:click={OnClick} class="text-indigo-700 dark:text-indigo-500 hover:underline cursor-pointer"><slot /></span>