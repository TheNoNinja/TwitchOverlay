<script lang="ts">

    function DebugCall(call: string){
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", `http://localhost:8080/debug/${call}`);
        httpRequest.send(null);
    }
</script>

<span class="relative z-0 inline-flex shadow-sm rounded-md mt-1 max-w-2xl">
  <button on:click={() => DebugCall("follow")} type="button" class="relative inline-flex items-center px-4 py-2 rounded-l-md bg-indigo-600 text-sm font-medium text-gray-100 hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500">
    Follow
  </button>
  <button on:click={() => DebugCall("subscribe")} type="button" class="-ml-px relative inline-flex items-center px-4 py-2 bg-indigo-600 text-sm font-medium text-gray-100 hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500">
    Subscribe
  </button>
  <button on:click={() => DebugCall("resubscribe")} type="button" class="-ml-px relative inline-flex items-center px-4 py-2 bg-indigo-600 text-sm font-medium text-gray-100 hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 ">
    Resubscribe
  </button>
  <button on:click={() => DebugCall("giftSubscribe")} type="button" class="-ml-px relative inline-flex items-center px-4 py-2 bg-indigo-600 text-sm font-medium text-gray-100 hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500">
    Subscription gift
  </button>
  <button on:click={() => DebugCall("anonGiftSubscribe")} type="button" class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md bg-indigo-600 text-sm font-medium text-gray-100 hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500">
    Anonymous subscription gift
  </button>
</span>



