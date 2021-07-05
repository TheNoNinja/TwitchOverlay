<script lang="ts">
    export let debug: string;

    function DebugCall(){
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", `http://localhost:8080/debug/${debug}`);
        httpRequest.send(null);
    }
</script>

<button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" on:click={DebugCall}>
    Debug {debug}
</button>