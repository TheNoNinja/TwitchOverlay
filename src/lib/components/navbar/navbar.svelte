<script>
    import DarkModeToggle from "$lib/components/dark-mode/dark-mode-toggle.svelte";
    import MenuItems from "./menu-items.svelte";
    import CloseIcon from "$lib/components/icons/close-icon.svelte";
    import UserAvatar from "./user-avatar.svelte";

    let isMobileMenuOpen = false;
</script>

<div class="{isMobileMenuOpen ? '' : 'pointer-events-none'} fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">

    <div class="{isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed inset-0 bg-gray-200/75 dark:bg-gray-900/75 transition-opacity ease-linear duration-300" aria-hidden="true"></div>

    <div class="{isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}      relative flex-1 flex flex-col       max-w-xs w-full       bg-gray-100 dark:bg-gray-800       transition ease-in-out duration-300 transform">
        <div class="{isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}     absolute top-0 right-0 -mr-12 pt-2      ease-in-out duration-300">
            <button type="button" on:click={() => isMobileMenuOpen = !isMobileMenuOpen} class="ml-1 flex items-center justify-center h-10 w-10">
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <CloseIcon/>
            </button>
        </div>

        <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
                <p class="text-2xl font-bold">TNNOverlay</p>
            </div>
            <nav class="mt-5 px-2 space-y-1">
                <MenuItems/>
            </nav>
        </div>
        <div class="flex items-center">
            <UserAvatar/>
        </div>
        <div class="h-12 inline-flex items-center justify-center">
            <DarkModeToggle/>
        </div>
    </div>

    <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
    </div>
</div>

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-gray-800">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                    <p class="text-2xl font-bold">TNNOverlay</p>
                </div>
                <nav class="mt-5 flex-1 px-2 space-y-1">
                    <MenuItems/>
                </nav>
            </div>
            <div class="flex items-center">
                <UserAvatar/>
            </div>
            <div class="h-12 inline-flex items-center justify-center">
                <DarkModeToggle/>
            </div>
        </div>
    </div>
</div>
<div class="flex flex-col w-0 flex-1 overflow-x-hidden">
    <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button on:click={() => isMobileMenuOpen = !isMobileMenuOpen} type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500">
            <span class="sr-only">Open sidebar</span>
            <!-- Heroicon name: outline/menu -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
    <div class="w-full h-full">
        <slot />
    </div>
</div>