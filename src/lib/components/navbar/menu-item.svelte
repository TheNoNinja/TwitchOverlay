<script>
    import {page} from "$app/stores";
    export let href;
    export let name;
</script>

<a href="{href}" class="{$page.path.startsWith(href) ?
                            'bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-50' :
                            'text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-900'}
                            group flex items-center px-2 py-2 text-base font-medium rounded-md transition ease-in-out duration-200">
    <slot />
    {name}
</a>
