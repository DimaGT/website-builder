import { Element } from '@craftjs/core';
import { ReactElement, ReactNode } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NodeButton } from './button';
import { NodeCard } from './card';
import { NodeOneBlock, NodeTwoBlocks, OneBlock } from './layout';
import NodeText from './text';

export type Components = {
  name: string;
  items: {
    name: string;
    props?: any;
    node: ReactElement;
    demo?: ReactNode;
  }[];
};

export const componentsMap: Components[] = [
  {
    name: 'Text',
    items: [
      {
        name: 'Paragraph',
        demo: <p className='text-base'>Sample paragraph text</p>,
        node: <NodeText text='Sample paragraph text - double click to edit' />
      },
      {
        name: 'Heading 1',
        props: { tagName: 'h1', fontSize: '32', fontWeight: 'bold' },
        demo: <h1 className='text-3xl font-bold'>Heading 1</h1>,
        node: (
          <NodeText
            text='Heading 1 - double click to edit'
            tagName='h1'
            fontSize='32'
            fontWeight='bold'
          />
        )
      },
      {
        name: 'Heading 2',
        props: { tagName: 'h2', fontSize: '24', fontWeight: 'bold' },
        demo: <h2 className='text-2xl font-bold'>Heading 2</h2>,
        node: (
          <NodeText
            text='Heading 2 - double click to edit'
            tagName='h2'
            fontSize='24'
            fontWeight='bold'
          />
        )
      },
      {
        name: 'Small Text',
        props: { fontSize: '12', color: { r: 100, g: 100, b: 100, a: 1 } },
        demo: <p className='text-xs text-gray-500'>Small text</p>,
        node: (
          <NodeText
            text='Small text - double click to edit'
            fontSize='12'
            color={{ r: 100, g: 100, b: 100, a: 1 }}
          />
        )
      }
    ]
  },
  {
    name: 'Buttons',
    items: [
      {
        name: 'Default',
        demo: <Button>Default</Button>,
        node: <NodeButton><NodeText text='Default' color={{ r: 255, g: 255, b: 255, a: 1 }} /></NodeButton>
      },
      {
        name: 'Outline',
        props: { variant: 'outline', children: 'Outline' },
        demo: <Button variant={'outline'}>Outline</Button>,
        node: <NodeButton variant={'outline'}><NodeText text='Outline'/></NodeButton>
      },
      {
        name: 'Destructive',
        props: { variant: 'destructive', children: 'Destructive' },
        demo: <Button variant={'destructive'}>Destructive</Button>,
        node: <NodeButton variant={'destructive'}><NodeText text='Destructive' color={{ r: 255, g: 255, b: 255, a: 1 }} /></NodeButton>
      }
    ]
  },
  {
    name: 'Cards',
    items: [
      {
        name: 'Default',
        demo: (
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>Empty Container</CardContent>
            <CardFooter>
              <Button className='w-full'>Footer button</Button>
            </CardFooter>
          </Card>
        ),
        node: <NodeCard></NodeCard>
      }
    ]
  },
  {
    name: 'Layout',
    items: [
      {
        name: 'One Block',
        demo: (
          <OneBlock className='text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400'>
            One Block
          </OneBlock>
        ),
        node: <Element canvas is={NodeOneBlock as typeof NodeOneBlock & string} id='one-block' />
      },
      {
        name: 'Two Blocks',
        demo: (
          <OneBlock className='text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex flex-row'>
            <OneBlock className='text-center italic bg-yellow-100 outline-dashed outline-amber-400'>
              First Block
            </OneBlock>
            <OneBlock className='text-center italic bg-yellow-100 outline-dashed outline-amber-400'>
              Second Block
            </OneBlock>
          </OneBlock>
        ),
        node: <NodeTwoBlocks></NodeTwoBlocks>
      }
    ]
  }
];
