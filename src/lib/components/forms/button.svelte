<script>
    export let OnClickCallback;
    export let IsFullWidth = false;
</script>

<button on:click={OnClickCallback} class="{IsFullWidth ? 'w-full' : ''} flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
    <slot/>
</button>