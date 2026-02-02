import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ZFlowEditor, Node } from 'zflow';

@Component({
  selector: 'app-zflow',
  standalone: true,
  imports: [CommonModule, ZFlowEditor],
  templateUrl: './zflow.component.html',
  styleUrls: ['./zflow.component.css']
})
export class ZFlowComponent {
  initialNodes: Node[] = [];
  gridSize = { width: 40, height: 40 };

  onNodesUpdate(nodes: Node[]) {
    console.log('State updated:', nodes);
  }
}
