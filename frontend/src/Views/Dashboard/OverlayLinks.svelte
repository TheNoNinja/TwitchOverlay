<script type="ts">
    let modifiers: Record<string, string | null>;
    $: modifiers = { "position": "right"};


</script>

<div>
    <div>
        <h2>Alerts overlay</h2>
        <h3>Settings</h3>
        <div class="w-1/2 md:flex md:items-center">
            <div class="mb-1 md:mb-0 md:w-1/3">
                <label for="alert-position">Alert position:</label>
            </div>

            <div class="relative inline-block text-gray-200 md:w-2/3 md:flex-grow">
                <select id="alert-position" bind:value={modifiers.position} class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 bg-gray-800 border rounded-lg appearance-none focus:shadow-outline text-gray-200 focus:outline-none focus:ring focus:border-blue-300">
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
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                </div>
            </div>
        </div>
        <h3>OBS URL</h3>
        <code>
            http://localhost:5000/alerts{#if modifiers.position !== null}?position={modifiers.position}{/if}
        </code>
        <h3>Requirements</h3>
        The height of the browser in OBS should have a minimum height of 150px.
        {#if modifiers.position !== null}Its recommended that you put the width a the full width of your stream.{:else}Its recommended that the minimum width is 350px. (You may even want to make it larger to make it fit large names.){/if}
    </div>
</div>