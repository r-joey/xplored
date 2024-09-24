<script>
     import { getImageURL } from '$lib/utils'
     import { page } from '$app/stores';
     import { toast } from 'svelte-sonner';
     export let data
     let user
     $: user = data?.user
     $: public_profile_link = `${$page.url.origin}/${user?.username}` 


    const copyToClipboard = () => {
      navigator.clipboard.writeText(public_profile_link).then(() => {
        toast.info("Profile link copied to clipboard");
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
</script>
<div class="navbar sticky z-10 top-0 bg-neutral text-neutral-content">
   <div class="flex-1"> 
     <a href="/_/dashboard" class="btn btn-ghost text-xl">Xplored</a>
   </div>
   <div class="flex-none gap-2"> 
     <div class="dropdown dropdown-end">
       <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
         <div class="w-10 rounded-full">
          <img src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} id="user-avatar" alt="" />
         </div>
       </div>
       <ul class="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
         <li>
           <button  onclick="public_profile_modal.showModal()" class="btn btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12m13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4" />
            </svg>
            Public profile
          </button> 
          </li>
          <li>
            <a href="/_/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                <path fill="currentColor" d="m16 24l-6.09-8.6A8.14 8.14 0 0 1 16 2a8.08 8.08 0 0 1 8 8.13a8.2 8.2 0 0 1-1.8 5.13Zm0-20a6.07 6.07 0 0 0-6 6.13a6.2 6.2 0 0 0 1.49 4L16 20.52L20.63 14A6.24 6.24 0 0 0 22 10.13A6.07 6.07 0 0 0 16 4" />
                <circle cx="16" cy="9" r="2" fill="currentColor" />
                <path fill="currentColor" d="M28 12h-2v2h2v14H4V14h2v-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2" />
              </svg>
              Dashboard
            </a>
          </li> 
          <li>
            <a href="/_/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                <path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z" />
              </svg>
              Profile
            </a>
          </li>
        <li> 
          <a href="/_/settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
              <path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z" />
              <path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4" />
            </svg>
            Settings
          </a>
        </li>
         <form action="/signout" method="POST"> 
           <li> 
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M6 30h12a2 2 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2" />
                  <path fill="currentColor" d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6z" />
                </svg>
                Logout
              </button>
            </li>
         </form>
       </ul>
     </div>
   </div>
 </div>   
<dialog id="public_profile_modal" class="modal">
  <div class="modal-box bg-neutral text-neutral-content">
    <h3 class="text-lg font-semibold text-center mb-2">Profle link</h3> 
    <div class="join w-full"> 
      <input readonly value={public_profile_link} class="text-black input input-bordered w-full join-item" /> 
      <button on:click={copyToClipboard} class="btn join-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
          <path fill="currentColor" d="M28 10v18H10V10zm0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2" />
          <path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" />
        </svg>
      </button> 
      <a href={public_profile_link} target="_blank" class="btn join-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M9 15L20 4m-5 0h5v5" />
        </svg>
      </a> 
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
 <slot></slot>