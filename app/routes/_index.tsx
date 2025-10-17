import { Editor, Element, Frame } from '@craftjs/core';
import { Canvas } from '~/components/canvas';
import { ControlPanel } from '~/components/control-panel';
import { Header } from '~/components/header';
import { NodeButton } from '~/components/node/button';
import {
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardFooter,
  NodeCardHeader,
  NodeCardTitle
} from '~/components/node/card';
import { componentsMap } from '~/components/node/components-map';
import { NodeOneBlock, NodeTwoBlocks } from '~/components/node/layout';
import NodeText from '~/components/node/text';
import { ReactIframe } from '~/components/react-iframe';
import { RenderNode } from '~/components/render-node';
import { SideMenu } from '~/components/side-menu';
import { Viewport } from '~/components/viewport';
import { EditingProvider } from '~/lib/editing-context';

export default function Index() {
  return (
    <section className='w-full min-h-screen flex flex-col'>
      <Header />
      <EditingProvider>
        <Editor
          resolver={{
            NodeButton,
            NodeText,
            Canvas,
            NodeCardHeader,
            NodeCard,
            NodeCardContent,
            NodeCardDescription,
            NodeCardTitle,
            NodeCardFooter,
            NodeOneBlock,
            NodeTwoBlocks
          }}
          onRender={RenderNode}
        >
          <div className='flex flex-1 relative overflow-hidden'>
            <SideMenu componentsMap={componentsMap} />
            <Viewport>
              <ReactIframe title='my frame' className='p-4 w-full h-full page-container'>
                <Frame>
                  <Element is={Canvas} id='ROOT' canvas>
                    <NodeText
                      text='Welcome to your page editor!'
                      tagName='h1'
                      fontSize='28'
                      fontWeight='bold'
                    />
                    <NodeText text='This is a sample paragraph. Double click to edit this text and customize it to your needs.' />
                    <NodeButton>
                      <NodeText text='Button 1'color={{ r: 255, g: 255, b: 255, a: 1 }}/>
                    </NodeButton>
                    <NodeButton>
                      <NodeText text='Button 2' color={{ r: 255, g: 255, b: 255, a: 1 }} />
                    </NodeButton>
                    <NodeButton>
                      <NodeText text='Button 3' color={{ r: 255, g: 255, b: 255, a: 1 }} />
                    </NodeButton>
                    <NodeButton>
                      <NodeText text='Button 4' color={{ r: 255, g: 255, b: 255, a: 1 }} />
                    </NodeButton>
                  </Element>
                </Frame>
              </ReactIframe>
            </Viewport>

            <ControlPanel />
          </div>
        </Editor>
      </EditingProvider>
    </section>
  );
}
