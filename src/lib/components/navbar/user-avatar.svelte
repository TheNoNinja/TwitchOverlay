<script>
    import Link from "$lib/components/external-link/external-link-no-underline.svelte";
    import {GetUsers} from "$lib/api/twitch/users";
    import {onMount} from "svelte";

    let isReady = false;
    let userData;
    $: userName = isReady ? userData.display_name : "";
    $: login = isReady ? userData["login"] : "";
    $: viewCount = isReady ? userData.view_count : "";
    $: profilePicture = isReady ? userData.profile_image_url : "";


    onMount(async () => {
        let result = await GetUsers();
        userData = result.data[0];
        isReady = true;
    });
</script>


<Link Href="https://twitch.tv/{login}">
    <div class="inline-flex justify-center items-center w-full">
        <div class="flex space-x-3 bg-gray-300 dark:bg-gray-900 rounded-md p-2 ">
            <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="{profilePicture}" alt="">
            </div>
            <div class="min-w-0 flex-1">
                <p class="text-sm font-medium">
                    {userName}
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-500">
                    {viewCount} views
                </p>
            </div>
        </div>
    </div>
</Link>

