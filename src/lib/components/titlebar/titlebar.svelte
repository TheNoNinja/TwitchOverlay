<script>
    function Minimize(){
        window.api.send("minimize-app", "");
    }
    function Maximize(){
        window.api.send("maximize-app", "");
    }
    function CloseApp(){
        window.api.send("close-app", "");
    }

</script>

<div class="absolute t-0 l-0 r-0 h-6 w-full bg-gray-50 dark:bg-gray-800 inline-flex align-middle pl-4" style="-webkit-app-region: drag;">
<!--<div class="flex-0 text-gray-800 dark:text-gray-50 ml-4">{$page.path}</div>-->
    <div class="flex-1"></div>
    <div class="flex-0 justify-self-end justify-center align-middle align-self-middle inline-flex" style="-webkit-app-region: none">
        <button class="bg-green-500 dark:bg-green-700 hover:bg-green-600 w-6 h-6" on:click={() => Minimize()}>_</button>
        <button class="bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 w-6 h-6" on:click={() => Maximize()}>O</button>
        <button class="bg-red-500 dark:bg-red-700 hover:bg-red-600 w-6 h-6" on:click={() => CloseApp()}>X</button>
    </div>
</div>