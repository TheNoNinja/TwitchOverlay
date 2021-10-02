<script>
    export let Id;
    export let Type;
    export let value;

    const onInput = e => value = e.target.value;
</script>

<div>
    <label for="{Id}" class="block font-bold text-gray-900 dark:text-gray-400 text-xl">
        <slot/>
    </label>
    <div class="mt-1">
        <input on:input={onInput} id="{Id}" name="{Id}" type="{Type !== undefined ? Type : 'text'}" required class="appearance-none block w-full px-3 py-2 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-md shadow-sm placeholder-gray-400 sm:text-sm">
    </div>
</div>