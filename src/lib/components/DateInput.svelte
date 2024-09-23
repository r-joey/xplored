<script>
    export let date = '';
    export let form 
 
    const maskDate = (value) => {  
      value = value.replace(/\D/g, '');
   
      if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
      if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7, 10);
   
      return value.slice(0, 10); 
    };

    const onInput = (event) => {
      date = maskDate(event.target.value);
    }

    $: date = maskDate(date)


  </script> 
<input type="text" class="input input-bordered input-sm lg:input-md {form?.formErrors?.date ? 'input-error' : ''}" name="date" bind:value={date} placeholder="YYYY-MM-DD" on:input={onInput} required />
{#if form?.formErrors?.date?.message}
  <div class="label">
    <span class="label-text-alt text-red-500">{form?.formErrors?.date?.message ?? ''}</span> 
  </div>
{/if}
 
  