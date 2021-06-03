<script>
  import Tailwind from './components/Tailwind.svelte';
  import { FirebaseApp, Collection } from 'sveltefire';
  import firebase, { Firestore } from './config/firebase';
  import Chart from 'svelte-frappe-charts';

  const countShoesSize = (arr) => {
    var dataArray = arr.map((a) => a.size);
    const map = dataArray
      .sort((a, b) => a - b)
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    return {
      labels: [...map.keys()],
      datasets: [
        {
          values: [...map.values()],
        },
      ],
    };
  };

  let formEntry = {
    name: '',
    email: '',
    age: 0,
    size: 0,
  };

</script>

<Tailwind />
<main class="w-3/4 mx-auto">
  <FirebaseApp {firebase}>
    <Collection path={'shoes'} let:data={shoes} let:ref={shoesRef} log>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="name"
          bind:value={formEntry.name}
          class="input input-bordered"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">E-Mail</span>
        </label>
        <input
          type="email"
          placeholder="e-mail"
          bind:value={formEntry.email}
          class="input input-bordered"
        />
      </div>
      <div class="flex flex-row gap-2 justify-items-stretch">
        <div class="form-control flex-1">
          <label class="label">
            <span class="label-text">Age</span>
          </label>
          <input
            type="number"
            placeholder="age"
            bind:value={formEntry.age}
            class="input input-bordered"
          />
        </div>
        <div class="form-control flex-1">
          <label class="label">
            <span class="label-text">Shoessize</span>
          </label>
          <input
            type="number"
            placeholder="shoessize"
            bind:value={formEntry.size}
            class="input input-bordered"
          />
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary btn-wide mt-3"
        disabled={!Object.values(formEntry).every((x) => !!x)}
        on:click={() => shoesRef.add(formEntry)}>Submit</button
      >

      {#if !shoes.length}
        No data collected
      {:else}
        <Chart data={countShoesSize(shoes)} type="bar" colors={['red']} />

        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>E-Mail</th>
              <th>Shoessize</th>
            </tr>
          </thead>
          <tbody>
            {#each shoes as shoe}
              <tr>
                <td>{shoe.name}</td>
                <td>{shoe.age}</td>
                <td>{shoe.email}</td>
                <td>{shoe.size}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      <!-- Only shown when loading -->
      <div slot="loading" />

      <!-- Shown on error or if nothing loads after maxWait time-->
      <div slot="fallback" />
    </Collection>
  </FirebaseApp>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;

    @apply w-full;
    @apply h-full;
  }

</style>
