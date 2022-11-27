<script lang="ts">
  export let columns: string[]
  export let data: Record<typeof columns[number], string>[]

  let tableEl: HTMLTableElement
  $: resizerHeight = tableEl?.offsetHeight ?? 0
</script>

<table bind:this={tableEl}>
  <thead>
    <tr>
      {#each columns as column}
        <th>
          <div>{column}</div>
          <button class="resize-handle" style:--height={resizerHeight + "px"} />
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each columns as column}
          <td><div>{row[column]}</div></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    display: grid;
    overflow: auto;
    grid-template-columns:
      minmax(150px, 1fr)
      minmax(150px, 1fr)
      minmax(150px, 1fr);
  }

  table thead,
  table tbody,
  table tr {
    display: contents;
  }

  table th {
    position: relative;
    font-size: 18px;
  }

  table th,
  table td {
    text-align: left;
    padding: 16px 20px;
    min-width: 100px;
  }

  table th div,
  table td div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }

  table tr td {
    border-top: 1px solid #ccc;
  }

  .resize-handle {
    display: block;
    position: absolute;
    cursor: col-resize;
    width: 7px;
    height: var(--height);
    right: 0;
    top: 0;
    z-index: 1;
    border-right: 2px solid transparent;
  }

  .resize-handle:hover {
    border-color: #ccc;
  }

  .resize-handle:active,
  .resize-handle:focus {
    border-color: #517ea5;
    outline: none;
  }
</style>
