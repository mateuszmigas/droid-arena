type Entity = number;
type BaseComponent = { type: string };

type ComponentOfType<
  TComponent extends BaseComponent,
  T extends TComponent["type"],
> = Extract<TComponent, { type: T }>;

export class EntityComponentSystem<TComponent extends BaseComponent> {
  private entities: Set<Entity> = new Set();
  private components = new Map<string, Map<Entity, TComponent>>();
  private nextEntityId = 0;

  createEntity(): Entity {
    const e = this.nextEntityId++;
    this.entities.add(e);
    return e;
  }

  addComponent<T extends TComponent>(entity: Entity, component: T): void {
    if (!this.components.has(component.type)) {
      this.components.set(component.type, new Map());
    }

    this.components.get(component.type)!.set(entity, component);
  }

  getComponents<T extends TComponent["type"]>(
    type: T
  ): Map<Entity, ComponentOfType<TComponent, T>> {
    return (
      (this.components.get(type) as Map<
        Entity,
        ComponentOfType<TComponent, T>
      >) || new Map()
    );
  }

  getComponent<T extends TComponent["type"]>(
    entity: Entity,
    type: T
  ): ComponentOfType<TComponent, T> | undefined {
    return this.components.get(type)?.get(entity) as ComponentOfType<
      TComponent,
      T
    >;
  }
}
