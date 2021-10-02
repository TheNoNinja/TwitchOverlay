<script>
    import CloseIcon from "$lib/components/icons/close-icon.svelte";
    import ErrorIcon from "$lib/components/icons/error-icon.svelte";

    export let Message;
    export let IsGlobal = false;
    export let OnDismiss;
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="{IsGlobal ? 'fixed bottom-0 inset-x-0 pb-2 sm:pb-5' : ''}">
    <div class="max-w-7xl mx-auto">
        <div class="p-2 rounded-lg bg-red-600 shadow-lg sm:p-3">
            <div class="flex items-center justify-between flex-wrap">
                <div class="w-0 flex-1 flex items-center">
                    <span class="flex p-2 rounded-lg bg-red-800 text-gray-50">
                        <ErrorIcon/>
                    </span>
                    <p class="ml-3 font-medium text-white truncate">
                        {Message}
                    </p>
                </div>
                <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                    <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-red-500 text-gray-50" on:click={OnDismiss}>
                        <CloseIcon/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>