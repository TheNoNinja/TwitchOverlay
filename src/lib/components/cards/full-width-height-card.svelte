<script>
    export let Header;
    export let Footer;
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="p-4" style="-webkit-user-select: text">
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-900 w-full h-full">
        {#if Header !== undefined && Header !== "" }
            <div class="px-4 py-5 sm:px-6 text-2xl font-bold">
                <p>
                    {Header}
                </p>
            </div>
        {/if}
        <div class="px-4 py-5 sm:p-6">
            <slot/>
        </div>
        {#if Footer !== undefined && Footer !== "" }
            <div class="px-4 py-3 sm:px-6 text-gray-400 dark:text-gray-500">
                <p>
                    {Footer}
                </p>
            </div>
        {/if}
    </div>
</div>