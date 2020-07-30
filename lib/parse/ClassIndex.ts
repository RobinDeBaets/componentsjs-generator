import { ClassDeclaration } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';

/**
 * A collection of classes, with exported name as key.
 */
export interface ClassIndex<T extends ClassReference> {
  // The exported name of the class, as visible by externals importing it.
  [className: string]: T;
}

/**
 * The name and location of a class.
 */
export interface ClassReference {
  // The name of the class within the file.
  localName: string;
  // The name of the file the class is defined in.
  fileName: string;
  // The optional super class.
  superClass?: string;
}

/**
 * A class reference with a full class declaration.
 */
export interface ClassReferenceLoaded {
  // The name of the class within the file.
  localName: string;
  // The name of the file the class is defined in.
  fileName: string;
  // The loaded class declaration.
  declaration: ClassDeclaration;
}
