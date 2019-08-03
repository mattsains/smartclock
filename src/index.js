import CanvasRenderer from './renderer';
import UI from './ui';
import { Browser, Node } from './renderer/platform';

let platform;
if (typeof document === 'undefined') {
  platform = new Node();
} else {
  platform = new Browser();
}

const canvas = platform.createCanvas();

new CanvasRenderer(canvas, platform).render(UI(platform));
