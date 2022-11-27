<script lang="ts">
  import ResizableTable from "./resizable-table.svelte"

  const _columns = ["artist", "title", "lyrics"] as const
  const columns = _columns as unknown as string[]

  type Song = {
    [col in typeof _columns[number]]: string
  }

  const songs: Song[] = [
    {
      artist: "UNISON SQUARE GARDEN",
      title: "クローバー",
      lyrics: "アルキメデスが恋に落ちた 11月の約束の日",
    },
    {
      artist: "UNISON SQUARE GARDEN",
      title: "お人好しカメレオン",
      lyrics: "お人好しカメレオンじゃないだろ 君だけのために君はいるんだよ",
    },
    {
      artist: "UNISON SQUARE GARDEN",
      title: "flat song",
      lyrics: "伝えることから始まれるような気がしてさ",
    },
    {
      artist: "UNISON SQUARE GARDEN",
      title: "シャンデリア・ワルツ",
      lyrics: "わからずやには 見えない魔法をかけたよ",
    },
    {
      artist: "UNISON SQUARE GARDEN",
      title: "春が来てぼくら",
      lyrics: "新しいと同じ数これまでの大切が続くように、なんて",
    },
    {
      artist: "SEKAI NO OWARI",
      title: "Dragon Night",
      lyrics: "だけど僕の嫌いな「彼」も彼なりの理由があると思うんだ",
    },
    {
      artist: "JUDY AND MARY",
      title: "あなたは生きている",
      lyrics: "深すぎた傷跡が消えないといいな",
    },
    {
      artist: "JUDY AND MARY",
      title: "KYOTO",
      lyrics: "深く眠る前に あなたの声を 忘れないように",
    },
    {
      artist: "BUMP OF CHICKEN",
      title: "虹を待つ人",
      lyrics: "見えない壁が見えた時には その先にいる人が見える",
    },
    {
      artist: "BUMP OF CHICKEN",
      title: "supernova",
      lyrics: "延べられた手を拒んだ その時に 大きな地震が起こるかもしれない",
    },
    {
      artist: "XIIX",
      title: "ユースレス・シンフォニー",
      lyrics: "誰の言うこともわかっちゃいない それでも全てを手にしてきた",
    },
    {
      artist: "XIIX",
      title: "like the rain",
      lyrics: "あなたの全てに染まる気はないのに",
    },
  ]
</script>

<ResizableTable data={songs} {columns} />
