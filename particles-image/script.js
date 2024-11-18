import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from '../libs/image-loader.js';
import { ParticleEffect } from './particle-effect.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('../resources/deadpool.png');
    let particleEffect = new ParticleEffect(10);
    let engine = new Engine(canvas, imageLoader, particleEffect);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({
        title: 'ASCII Art',
    });
    pane.registerPlugin(TweakpaneFileImportPlugin);
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });
    params.addBinding(particleEffect, 'resolution', { min: 1, max: 100, step: 1 });

    const image = params.addFolder({ title: 'Image' });
    image.addBinding(imageLoader, 'imageFile', {
        view: 'file-input',
        lineCount: 3,
        filetypes: ['.png', '.jpg'],
        invalidFiletypeMessage: 'Unsupported file type !'
    });

    window.onresize = () => {
        engine.stopAnimation();
        engine.init(window.innerWidth, window.innerHeight);
        engine.startAnimation();
    };

    canvas.onmouseenter = canvas.onmousemove = event => {
        engine.mouseX = event.x;
        engine.mouseY = event.y;
    };

    canvas.onmouseleave = () => {
        engine.mouseX = undefined;
        engine.mouseY = undefined;
    };
};