<script>
    import {getStore} from "$lib/stores";
    import {onMount} from "svelte";

    let darkModeStore;
    let darkMode;

    $: {
        $darkModeStore;
        UpdateClass();
    }

    onMount(() => {
        darkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            darkMode = e.matches;
            UpdateStore();
        });

        darkModeStore = getStore("dark-mode", darkMode);
        UpdateStore();
    });

    function UpdateStore(){
        $darkModeStore = darkMode;
    }

    function UpdateClass(){
        darkMode = $darkModeStore;
        if (darkMode === undefined) return;

        if (darkMode){
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }
</script>