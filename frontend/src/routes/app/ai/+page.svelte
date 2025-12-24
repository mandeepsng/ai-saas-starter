<script>
  import { api } from '$lib/services/api';

  let prompt = '';
  let result = '';

  async function run() {
    const res = await api.post('/ai/demo', { prompt });
    result = res.output;
  }
</script>

<textarea bind:value={prompt} />
<button on:click={run}>Run AI</button>

<pre>{result}</pre>
