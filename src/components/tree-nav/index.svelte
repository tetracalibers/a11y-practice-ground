<script lang="ts">
  import Edge from "./edge.svelte"
  import Node from "./node.svelte"
  import Root from "./root.svelte"
</script>

<nav aria-label="Mythical University">
  <Root title="Mythical University">
    <Node href="#home">Home</Node>
    <Edge subTreeTitle="About">
      <Node href="#overview">Overview</Node>
      <Node href="#adminstration">Administration</Node>
      <Edge subTreeTitle="Facts">
        <Node href="#history">History</Node>
        <Node href="#current-statistics">Current Statistics</Node>
        <Node href="#awards">Awards</Node>
      </Edge>
      <Edge subTreeTitle="Campus Tours">
        <Node href="#for-prospective-students">For Prospective Students</Node>
        <Node href="#for-alumni">For Alumni</Node>
        <Node href="#for-visitors">For Visitors</Node>
      </Edge>
    </Edge>
    <Edge subTreeTitle="Admissions">
      <Node href="#apply">Apply</Node>
      <Edge subTreeTitle="Tuition">
        <Node href="#undergraduate">Undergraduate</Node>
        <Node href="#graduate">Graduate</Node>
        <Node href="#professional-schools">Professional Schools</Node>
      </Edge>
    </Edge>
    <Node href="signup">Sign Up</Node>
    <Node href="#visit">Visit</Node>
    <Node href="#photo-tour">Photo tour</Node>
    <Node href="#connect">Connect</Node>
    <Edge subTreeTitle="Academics">
      <Node href="#colleges-and-schools">Colleges & Schools</Node>
      <Node href="#programs-of-study">Programs of Study</Node>
      <Node href="#honors-programs">Honors Programs</Node>
      <Node href="#course-explorer">Course Explorer</Node>
      <Node href="#register-for-classes">Register for Classes</Node>
      <Node href="#academic-calendar">Academic Calendar</Node>
      <Node href="#transcripts">Transcripts</Node>
    </Edge>
  </Root>
</nav>
