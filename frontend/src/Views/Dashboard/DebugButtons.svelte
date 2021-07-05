<script lang="ts">
    import DebugButton from "./DebugButton.svelte";
    import OverlayLinks from "./OverlayLinks.svelte";
</script>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-300">Dashboard</h1>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="py-4">
        <DebugButton debug="follow"/>
        <DebugButton debug="subscribe"/>
        <DebugButton debug="resubscribe"/>
        <DebugButton debug="giftSubscribe"/>
        <DebugButton debug="anonGiftSubscribe"/>

        <OverlayLinks/>
    </div>
    <!-- /End replace -->
</div>


