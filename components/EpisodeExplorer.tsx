"use client";
import { useState } from "react";
import DataFigure, { type Kind } from "./DataFigure";
const views: {name:string; kind:Kind; description:string}[]=[
 {name:"Depth",kind:"pointcloud",description:"Synthetic depth returns illustrate how scene geometry becomes a spatial observation. This is not camera footage."},
 {name:"Motion",kind:"trajectories",description:"Illustrative joint traces show how robot motion changes across reach, grasp, transport, and release."},
 {name:"Contact",kind:"contact",description:"A synthetic force profile illustrates contact onset, grip, and release. Values are not measured hardware performance."},
 {name:"Provenance",kind:"calibration",description:"Illustrative calibration residuals show the type of evidence that can accompany an episode."}
];
export default function EpisodeExplorer(){
 const [active,setActive]=useState(0);const view=views[active];
 return <section id="episode" className="wrap band"><div className="section-heading"><div><p className="eyebrow">02 / Episode explorer</p><h2 className="h2">One task.<br/>Multiple ways to observe it.</h2></div><p className="body">Explore an illustrative manipulation episode. All visualizations below are synthetic examples, not production data.</p></div><div className="episode-shell"><div className="episode-toolbar"><span className="mono">DEMO / PICK & PLACE</span><span className="demo-badge">Illustrative</span></div><div className="episode-options" aria-label="Episode views">{views.map((v,i)=><button key={v.name} aria-pressed={active===i} aria-controls="episode-view" onClick={()=>setActive(i)}>{v.name}</button>)}</div><div id="episode-view"><DataFigure kind={view.kind} alt={view.description}/><p className="episode-description" aria-live="polite">{view.description}</p></div><details className="episode-metadata"><summary>Inspect example delivery metadata</summary><pre>{JSON.stringify({example:true,task:"pick_and_place",format:"LeRobot v2",signals:["observation.state","action","annotation.<source>.<type>"],provenance:["cell_id","calibration_id","qa_result"]},null,2)}</pre></details></div></section>;
}
