<script lang="ts">
    import {Router, Route, Link} from "svelte-routing";

    import Sidebar from "./Sidebar.svelte";

    import DebugOverlay from "./DebugOverlay/DebugOverlay.svelte";
</script>

<div class="h-screen flex overflow-hidden bg-gray-900">
    <Sidebar/>

    <div class="flex flex-col w-0 flex-1 overflow-hidden text-gray-300">
        <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="sr-only">Open sidebar</span>
                <!-- Heroicon name: outline/menu -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div class="py-6">
                <Router>
                    <Route path="/">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 class="text-2xl font-semibold text-gray-300">Dashboard</h1>
                        </div>
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div class="py-4">
                                <Link to="/Dashboard/DebugOverlay"><button class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Debug Overlay</button></Link>
                            </div>
                        </div>
                    </Route>
                    <Route path="DebugOverlay" component={DebugOverlay}/>
                </Router>
            </div>
        </main>
    </div>
</div>

