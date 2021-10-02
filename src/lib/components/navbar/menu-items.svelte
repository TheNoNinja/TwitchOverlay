<script>
    import DashboardIcon from "$lib/components/icons/dashboard-icon.svelte";
    import ChatIcon from "$lib/components/icons/chat-icon.svelte";
    import MenuItem from "./menu-item.svelte";
</script>

<MenuItem href="/dashboard" name="Dashboard" >
    <DashboardIcon Class="mr-4 flex-shrink-0" />
</MenuItem>


<MenuItem href="/chat" name="Chat overlay">
    <ChatIcon Class="mr-4 flex-shrink-0" />
</MenuItem>