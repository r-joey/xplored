<script>
  import "../app.css";
  import { Toaster } from 'svelte-sonner'
</script>

<Toaster richColors position="bottom-left" theme="dark" closeButton  /> 
<div class="bg-base-100 min-h-screen">
  <slot></slot>
</div>
  