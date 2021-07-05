<script lang="ts">
    import DebugButtons from "./DebugButtons.svelte";

    let alertModifiers: Record<string, string | null>;
    $: alertModifiers = { "position": "right"};
</script>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-300">Debug overlay</h1>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="py-4">
        <div class="bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-4 sm:px-6">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-300">
                        Alert messages
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-400">
                        All information about alert messages. You can even test it out by using the debug buttons below.
                    </p>
                </div>
                <div>
                    <dl>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-300">
                                Alert position
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                                <select id="alert-position" bind:value={alertModifiers.position} class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 bg-gray-900 border rounded-lg appearance-none focus:shadow-outline text-gray-200 focus:outline-none focus:ring focus:border-blue-300 border-0">
                                    <option value="left">
                                        left
                                    </option>
                                    <option value="right">
                                        right
                                    </option>
                                    <option value={null}>
                                        stretch
                                    </option>
                                </select>
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-300">
                                Alert URL
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                                http://localhost:5000/alerts{#if alertModifiers.position !== null}?position={alertModifiers.position}{/if}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-300">
                                Width
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                                {#if alertModifiers.position !== null}Its recommended that you put the width a the full width of your stream.{:else}Its recommended that the minimum width is 350px. (You may even want to make it larger to make it fit large names.){/if}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-300">
                                Height
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                                150px is the minimal recommended height.
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-300">
                        Debug buttons
                    </h3>
                    <DebugButtons/>
                </div>
            </div>
        </div>
    </div>
</div>