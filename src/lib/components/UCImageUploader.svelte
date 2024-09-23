<script>
    import * as UC from '@uploadcare/file-uploader';
    import { PUBLIC_UC_KEY } from '$env/static/public';
    import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css"
    import { onMount } from 'svelte';
    export let files = [];
    export let maxFiles = 15;
    let uploadedFiles = [];
    let ctxProviderRef;
    const uploaderCtxName = "xplorer-uploader"; 
    // $: console.log(files)
    const resetUploaderState = () => {
        const api = ctxProviderRef.getAPI()
        api.removeAllFiles()
    };

    const handleRemoveClick = (uuid) => {
        files = files.filter((f) => f.uuid !== uuid);
    };

    const handleChangeEvent = (event) => { 
        if(event.detail){
            uploadedFiles = event.detail.allEntries.filter((f) => f.status === "success"); 
        }
    }

    const handleModalCloseEvent = () => {
        resetUploaderState();  
        files = [...files, ...uploadedFiles];
        uploadedFiles = [];
    };

    onMount(() => {
        UC.defineComponents(UC); 
        ctxProviderRef.addEventListener("change", handleChangeEvent);
        ctxProviderRef.addEventListener("modal-close", handleModalCloseEvent);

        return () => {
            ctxProviderRef.removeEventListener("change", handleChangeEvent);
            ctxProviderRef.removeEventListener("modal-close", handleModalCloseEvent); 
    };
    });
     
  </script>
  
  <div>

    <uc-config 
        ctx-name={uploaderCtxName} 
        source-list="local, url, camera"  
        imageShrink="800x600" 
        multipleMax={maxFiles} 
        pubkey={PUBLIC_UC_KEY}>
    </uc-config>
  
    <uc-file-uploader-regular ctx-name={uploaderCtxName} class="uc-light uc-turquoise"></uc-file-uploader-regular>

    <uc-upload-ctx-provider bind:this={ctxProviderRef} ctx-name={uploaderCtxName}></uc-upload-ctx-provider>
 
    <div class="previews grid grid-cols-3 lg:grid-cols-4 my-2">
        {#each files as file (file.cdnUrl)} 
            <div class="avatar relative p-3"> 
                <button  class="absolute btn btn-circle btn-xs top-0 right-0 btn-active btn-ghost" on:click={() => handleRemoveClick(file.uuid)} aria-label="Remove file"  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill="white" d="m12.96 4.46l-1.42-1.42L8 6.59L4.46 3.04L3.04 4.46L6.59 8l-3.55 3.54l1.42 1.42L8 9.41l3.54 3.55l1.42-1.42L9.41 8z"/>
                  </svg>
                </button>

                <div class="w-24 rounded">
                  <img src={`${file.cdnUrl}/-/preview/-/resize/x200/`} width="100" alt={file.fileInfo.originalFilename} title={file.fileInfo.originalFilename} />
                </div>
              </div>  
        {/each}
      </div> 
  </div>