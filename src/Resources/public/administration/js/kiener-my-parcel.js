(this.webpackJsonp=this.webpackJsonp||[]).push([["kiener-my-parcel"],{Gqyr:function(e,t){e.exports='{% block sw_myparcel_orders %}\n    <sw-page class="sw-myparcel">\n        {% block sw_myparcel_smart_bar_header %}\n            <template #smart-bar-header>\n                {% block sw_myparcel_smart_bar_header_title %}\n                <h2>\n                    {% block sw_myparcel_smart_bar_header_title_text %}\n                        {{ $tc(\'sw-myparcel.general.mainMenuItemGeneral\') }}: {{ $tc(\'sw-myparcel.orders.title\') }}\n                    {% endblock %}\n                </h2>\n                {% endblock %}\n            </template>\n        {% endblock %}\n\n        {% block sw_myparcel_smart_bar_actions %}\n            <template #smart-bar-actions>\n                <sw-button :disabled="true" variant="primary" :square="false" :block="false" :isLoading="false" @click="onOpenCreateMultipleShipmentsModal">\n                    {{ $tc(\'sw-myparcel.orders.buttons.createShipmentsButton\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        {% block sw_myparcel_content %}\n            <template #content>\n                <sw-grid\n                    :items="shippingOptions"\n                    :isFullpage="true"\n                    :table="true"\n                    :sortBy="sortBy"\n                    :sortDirection="sortDirection"\n                    @sw-grid-select-item="onSelectionChanged"\n                    @sw-grid-select-all="onSelectionChanged"\n                    @sort-column="onSortColumn">\n                    <template slot="columns" slot-scope="{ item }">\n                        <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.orderColumn\')" dataIndex="order.orderNumber" :sortable="true">\n                            {{ item.order.orderNumber }}\n                        </sw-grid-column>\n\n                        <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.orderDateColumn\')" dataIndex="order.orderDateTime" :sortable="true">\n                            {{ item.order.orderDateTime | date({hour: \'2-digit\', minute: \'2-digit\'}) }}\n                        </sw-grid-column>\n\n                        <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.totalAmountColumn\')">\n                            {{ item.order.amountTotal | currency(\'EUR\') }}\n                        </sw-grid-column>\n\n                        <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.statusColumn\')">\n                            {{ item.order.stateMachineState.name }}\n                        </sw-grid-column>\n\n                        <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.actionsColumn\')">\n                            <sw-context-button :showMenuOnStartup="false" :menuWidth="220" menuHorizontalAlign="right" menuVerticalAlign="bottom" icon="small-more" :disabled="false" :autoClose="true" :zIndex="9000">\n                                <sw-context-menu-item class="sw-myparcel-shipping-options-list__order-view-action" :routerLink="{ name: \'sw.order.detail\', params: { id: item.orderId } }">\n                                    {{ $tc(\'sw-myparcel.orders.buttons.viewOrder\') }}\n                                </sw-context-menu-item>\n                                <sw-context-menu-item class="sw-myparcel-shipping-options-list__create-shipment-action" @click="onOpenCreateSingleShipmentModal(item)">\n                                    {{ $tc(\'sw-myparcel.orders.buttons.createShipmentButton\') }}\n                                </sw-context-menu-item>\n                            </sw-context-button>\n                        </sw-grid-column>\n                    </template>\n                </sw-grid>\n\n                <sw-modal v-if="createSingleShipment.showModal === true"\n                          :title="$tc(\'sw-myparcel.orders.modals.createShipment.titleSingle\')"\n                          @modal-close="onCloseSingleShipmentModal"\n                          variant="small">\n\n                    <form>\n\n                        <sw-select-field\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.actionTypeHeading\')"\n                                name="myparcel[action_type]"\n                                v-model="createSingleShipment.actionType">\n\n                            <option value="download">{{ $tc(\'sw-myparcel.orders.modals.createShipment.actionTypeDownloadLabel\') }}</option>\n                            <option value="download">{{ $tc(\'sw-myparcel.orders.modals.createShipment.actionTypeCreateLabel\') }}</option>\n                        </sw-select-field>\n\n                        <sw-select-number-field\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.packageTypeHeading\')"\n                                name="myparcel[package_type]"\n                                v-model="createSingleShipment.item.packageType">\n\n                            <option value="1">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypePackageLabel\') }}</option>\n                            <option value="2">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeMailboxLabel\') }}</option>\n                            <option value="3">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeLetterLabel\') }}</option>\n                            <option value="4">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeDigitalStampLabel\') }}</option>\n                        </sw-select-number-field>\n\n                        <sw-multi-select\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.printPositionHeading\')"\n                                name="myparcel[print_position]"\n                                v-model="createSingleShipment.printPosition"\n                                :options="[\n                                { value: 1, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionTopLeftLabel\') },\n                                { value: 2, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionTopRightLabel\') },\n                                { value: 3, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionBottomLeftLabel\') },\n                                { value: 4, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionBottomRightLabel\') },\n                            ]">\n                        </sw-multi-select>\n\n                        <sw-number-field\n                            :label="$tc(\'sw-myparcel.orders.modals.createShipment.numberOfLabelsHeading\')"\n                            name="myparcel[number_of_labels]"\n                            numberType="int"\n                            :min="1"\n                            :step="1"\n                            v-model="createSingleShipment.numberOfLabels" />\n\n                        <template v-if="createSingleShipment.item.packageType === 1">\n                            <sw-base-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.shippingOptionsHeading\')" />\n                            <sw-checkbox-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.optionOnlyRecipientLabel\')" name="myparcel[only_recipient]" value="1" v-model="createSingleShipment.item.onlyRecipient" :checked="onlyRecipientChecked(createSingleShipment.item)" :disabled="onlyRecipientDisabled(createSingleShipment.item)" />\n                            <sw-checkbox-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.optionRequiresAgeCheckLabel\')" name="myparcel[requires_age_check]" value="1" v-model="createSingleShipment.item.requiresAgeCheck" />\n                            <sw-checkbox-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.optionRequiresSignatureLabel\')" name="myparcel[requires_signature]" value="1" v-model="createSingleShipment.item.requiresSignature" />\n                            <sw-checkbox-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.optionReturnIfNotHomeLabel\')" name="myparcel[return_if_not_home]" value="1" v-model="createSingleShipment.item.returnIfNotHome" />\n                            <sw-checkbox-field :label="$tc(\'sw-myparcel.orders.modals.createShipment.optionLargePackageLabel\')" name="myparcel[large_package]" value="1" v-model="createSingleShipment.item.largePackage" /><br />\n                        </template>\n\n                        <template v-else>\n                            <input type="hidden" name="myparcel[requires_age_check]" value="0" />\n                            <input type="hidden" name="myparcel[requires_signature]" value="0" />\n                            <input type="hidden" name="myparcel[return_if_not_home]" value="0" />\n                            <input type="hidden" name="myparcel[large_package]" value="0" />\n                        </template>\n\n                    </form>\n\n                    <template slot="modal-footer">\n                        <sw-button @click="onCloseSingleShipmentModal" size="small">\n                            {{ $tc(\'sw-myparcel.orders.buttons.cancelButton\') }}\n                        </sw-button>\n                        <sw-button @click="onCreateSingleShipment" variant="primary" size="small">\n                            {{ $tc(\'sw-myparcel.orders.buttons.createShipmentButton\') }}\n                        </sw-button>\n                    </template>\n                </sw-modal>\n\n                <sw-modal v-if="createMultipleShipments.showModal === true"\n                          :title="$tc(\'sw-myparcel.orders.modals.createShipment.titleMultiple\', 0, { numberOfItems: selectedShippingOptionIds.length })"\n                          @modal-close="onCloseMultipleShipmentsModal"\n                          variant="small">\n\n                    <form>\n\n                        <sw-select-field\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.actionTypeHeading\')"\n                                name="myparcel[action_type]"\n                                v-model="createMultipleShipments.actionType">\n\n                            <option value="download">{{ $tc(\'sw-myparcel.orders.modals.createShipment.actionTypeDownloadLabel\') }}</option>\n                            <option value="download">{{ $tc(\'sw-myparcel.orders.modals.createShipment.actionTypeCreateLabel\') }}</option>\n                        </sw-select-field>\n\n                        <sw-select-number-field\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.packageTypeHeading\')"\n                                name="myparcel[package_type]"\n                                v-model="createMultipleShipments.packageType">\n\n                            <option value="1">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypePackageLabel\') }}</option>\n                            <option value="2">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeMailboxLabel\') }}</option>\n                            <option value="3">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeLetterLabel\') }}</option>\n                            <option value="4">{{ $tc(\'sw-myparcel.orders.modals.createShipment.packageTypeDigitalStampLabel\') }}</option>\n                        </sw-select-number-field>\n\n                        <sw-multi-select\n                                :label="$tc(\'sw-myparcel.orders.modals.createShipment.printPositionHeading\')"\n                                name="myparcel[print_position]"\n                                v-model="createMultipleShipments.printPosition"\n                                :options="[\n                                { value: 1, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionTopLeftLabel\') },\n                                { value: 2, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionTopRightLabel\') },\n                                { value: 3, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionBottomLeftLabel\') },\n                                { value: 4, label: $tc(\'sw-myparcel.orders.modals.createShipment.positionBottomRightLabel\') },\n                            ]">\n                        </sw-multi-select>\n\n                    </form>\n\n                    <template slot="modal-footer">\n                        <sw-button @click="onCloseMultipleShipmentsModal" size="small">\n                            {{ $tc(\'sw-myparcel.orders.buttons.cancelButton\') }}\n                        </sw-button>\n                        <sw-button @click="onCreateMultipleShipments" variant="primary" size="small">\n                            {{ $tc(\'sw-myparcel.orders.buttons.createShipmentsButton\') }}\n                        </sw-button>\n                    </template>\n                </sw-modal>\n            </template>\n\n            <template #pagination>\n                <sw-pagination :page="page"\n                               :limit="limit"\n                               :total="total"\n                               :total-visible="7">\n                </sw-pagination>\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}'},HfHS:function(e,t,n){"use strict";n.r(t);const i=Shopware.Classes.ApiService;var a=class extends i{constructor(e,t,n="myparcel"){super(e,t,n)}all(){const e=this.getBasicHeaders();return this.httpClient.get(`_action/${this.getApiBasePath()}/shipping-options/all`,{headers:e}).then(e=>i.handleResponse(e))}};const o=Shopware.Classes.ApiService;var s=class extends o{constructor(e,t,n="myparcel"){super(e,t,n)}createShipment(e={consignment_id:null,shipping_option_id:null,order_id:null,order_version_id:null,label_url:null,insured_amount:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/shipment/create`,JSON.stringify(e),{headers:t}).then(e=>o.handleResponse(e))}};const r=Shopware.Classes.ApiService;var l=class extends r{constructor(e,t,n="myparcel"){super(e,t,n)}createConsignments(e={order_ids:null,label_positions:null,number_of_labels:null,package_type:null,shipment_id:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/consignment/create-consignments`,JSON.stringify(e),{headers:t}).then(e=>r.handleResponse(e))}};const{Application:p}=Shopware;p.addServiceProvider("MyParcelShippingOptionsService",e=>{const t=p.getContainer("init");return new a(t.httpClient,e.loginService)}),p.addServiceProvider("MyParcelShipmentService",e=>{const t=p.getContainer("init");return new s(t.httpClient,e.loginService)}),p.addServiceProvider("MyParcelConsignmentService",e=>{const t=p.getContainer("init");return new l(t.httpClient,e.loginService)});var m=n("Gqyr"),c=n.n(m);const{Component:d,Mixin:h}=Shopware,{Criteria:g}=Shopware.Data;d.register("sw-myparcel-orders",{template:c.a,mixins:[h.getByName("listing"),h.getByName("notification")],inject:["repositoryFactory","MyParcelShipmentService","MyParcelConsignmentService"],data:()=>({isLoading:!1,shippingOptions:[],sortBy:"createdAt",sortDirection:"ASC",createSingleShipment:{item:null,actionType:"download",printPosition:[1,2,3,4],numberOfLabels:1,showModal:!1},createMultipleShipments:{items:[],actionType:"download",packageType:1,printPosition:[1,2,3,4],showModal:!1},selectedShippingOptions:null,selectedShippingOptionIds:[]}),metaInfo(){return{title:this.$createTitle()}},mounted(){this.getList()},computed:{createMultipleShipmentsAvailable(){return!!this.selectedShippingOptionIds&&this.selectedShippingOptionIds.length>0||!1},shippingOptionRepository(){return this.repositoryFactory.create("kiener_my_parcel_shipping_option")},shippingOptionCriteria(){const e=new g(this.page,this.limit);return e.setTerm(this.term),e.addSorting(g.sort(this.sortBy,this.sortDirection)),e.addAssociation("order"),e}},methods:{saveSingleShipment(e){this.MyParcelShipmentService.createShipment({order_id:e.item.order.id,order_version_id:e.item.order.versionId,shipping_option_id:e.item.id}).then(t=>{if(t.success&&t.shipment){let n={order_id:e.item.order.id,order_version_id:e.item.order.versionId};this.createConsignments([n],e,t.shipment)}}),this.createSingleShipment.showModal=!1},createConsignments(e,t,n){this.MyParcelConsignmentService.createConsignments({order_ids:e,label_positions:t.printPosition,package_type:t.packageType,number_of_labels:t.numberOfLabels,shipment_id:n.id}).then(e=>{console.log(e)})},getList(){return this.isLoading=!0,this.shippingOptionRepository.search(this.shippingOptionCriteria,Shopware.Context.api).then(e=>(this.total=e.total,this.shippingOptions=e,this.isLoading=!1,e)).catch(()=>{this.isLoading=!1})},onlyRecipientChecked(e){return!0===this.onlyRecipientDisabled(e)||e.onlyRecipient},onlyRecipientDisabled:e=>1===e.deliveryType||3===e.deliveryType,onSelectionChanged(e){if(this.selectedShippingOptions=e,this.selectedShippingOptionIds=[],this.selectedShippingOptions)for(let e in this.selectedShippingOptions)this.selectedShippingOptionIds.push(e)},onSortColumn(e){let t=this.sortDirection;t="ASC"===t?"DESC":"ASC",this.sortBy!==e.dataIndex&&(t="ASC"),this.sortBy=e.dataIndex,this.sortDirection=t,this.getList()},onOpenCreateSingleShipmentModal(e){this.createSingleShipment.item=e,this.selectedShippingOptionIds=[e.id],this.createSingleShipment.showModal=!0},onCloseSingleShipmentModal(){this.createSingleShipment.showModal=!1},onCreateSingleShipment(){this.createSingleShipment.item&&this.shippingOptionRepository.save(this.createSingleShipment.item,Shopware.Context.api).then(()=>{this.saveSingleShipment(this.createSingleShipment)}).catch(()=>{})},onOpenCreateMultipleShipmentsModal(){this.selectedShippingOptionIds&&this.selectedShippingOptionIds.length&&(this.createMultipleShipments.items=this.selectedShippingOptions,this.createMultipleShipments.showModal=!0)},onCloseMultipleShipmentsModal(){this.createMultipleShipments.showModal=!1},onCreateMultipleShipments(){console.log(this.createMultipleShipments.items)}}});var u=n("btkK"),w=n.n(u);const{Component:y,Mixin:b}=Shopware,{Criteria:S}=Shopware.Data;y.register("sw-myparcel-shipments",{template:w.a,mixins:[b.getByName("listing")],inject:["repositoryFactory"],data:()=>({isLoading:!1,shipments:[],sortBy:"createdAt",sortDirection:"ASC"}),metaInfo(){return{title:this.$createTitle()}},mounted(){this.getList()},computed:{shipmentRepository(){return this.repositoryFactory.create("kiener_my_parcel_shipment")},shipmentCriteria(){const e=new S(this.page,this.limit);return e.setTerm(this.term),e.addSorting(S.sort(this.sortBy,this.sortDirection)),e.addAssociation("order"),e.addAssociation("shippingOption"),e}},methods:{getList(){return this.isLoading=!0,this.shipmentRepository.search(this.shipmentCriteria,Shopware.Context.api).then(e=>(this.total=e.total,this.shipments=e,this.isLoading=!1,e)).catch(()=>{this.isLoading=!1})},onSelectionChanged(e){if(this.selectedShippingOptions=e,this.selectedShippingOptionIds=[],this.selectedShippingOptions)for(let e in this.selectedShippingOptions)this.selectedShippingOptionIds.push(e)},onSortColumn(e){let t=this.sortDirection;t="ASC"===t?"DESC":"ASC",this.sortBy!==e.dataIndex&&(t="ASC"),this.sortBy=e.dataIndex,this.sortDirection=t,this.getList()},onDownloadLabel(e){e.labelUrl&&window.open(e.labelUrl)}}});var k=n("dw5Z"),_=n.n(k);const{Component:C,Mixin:f}=Shopware,{Criteria:L}=Shopware.Data;C.register("sw-myparcel-shipping-methods",{template:_.a,mixins:[f.getByName("listing")],inject:["repositoryFactory"],data:()=>({isLoading:!1,shippingMethods:[],sortBy:"createdAt",sortDirection:"ASC"}),metaInfo(){return{title:this.$createTitle()}},mounted(){this.getList()},computed:{shippingMethodRepository(){return this.repositoryFactory.create("kiener_my_parcel_shipping_method")},shippingMethodCriteria(){const e=new L(this.page,this.limit);return e.setTerm(this.term),e.addSorting(L.sort(this.sortBy,this.sortDirection)),e}},methods:{getList(){return this.isLoading=!0,this.shippingMethodRepository.search(this.shippingMethodCriteria,Shopware.Context.api).then(e=>(this.total=e.total,this.shippingMethods=e,this.isLoading=!1,e)).catch(()=>{this.isLoading=!1})},onSortColumn(e){let t=this.sortDirection;t="ASC"===t?"DESC":"ASC",this.sortBy!==e.dataIndex&&(t="ASC"),this.sortBy=e.dataIndex,this.sortDirection=t,this.getList()}}});var M=n("u46F"),v=n.n(M);const{Component:x}=Shopware;x.override("sw-settings-index",{template:v.a});var T=n("jn0X"),O=n("w347"),$=n("g4Un");const{Module:B}=Shopware;B.register("sw-myparcel",{type:"plugin",name:"MyParcel",title:"sw-myparcel.general.mainMenuItemGeneral",description:"sw-myparcel.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",color:"#0f5c47",icon:"default-action-settings",snippets:{"nl-NL":T,"de-DE":O,"en-GB":$},routes:{orders:{component:"sw-myparcel-orders",path:"orders"},shipments:{component:"sw-myparcel-shipments",path:"shipments",meta:{parentPath:"sw.myparcel.orders"}},shippingMethods:{component:"sw-myparcel-shipping-methods",path:"shipping/methods",meta:{parentPath:"sw.myparcel.orders"}}},navigation:[{id:"sw-myparcel",label:"sw-myparcel.general.mainMenuItemGeneral",color:"#0f5c47",path:"sw.myparcel.orders",icon:"default-shopping-paper-bag-product",position:100},{id:"sw-myparcel-orders",label:"sw-myparcel.general.ordersMenuItemGeneral",color:"#0f5c47",path:"sw.myparcel.orders",position:100,parent:"sw-myparcel"},{id:"sw-myparcel-shipments",path:"sw.myparcel.shipments",label:"sw-myparcel.general.shipmentsMenuItemGeneral",color:"#0f5c47",position:100,parent:"sw-myparcel"},{id:"sw-myparcel-shipping-methods",path:"sw.myparcel.shippingMethods",label:"sw-myparcel.general.shippingMethodsMenuItemGeneral",color:"#0f5c47",position:100,parent:"sw-myparcel"}]})},btkK:function(e,t){e.exports='{% block sw_myparcel_shipments %}\n<sw-page class="sw-myparcel-shipments">\n    {% block sw_myparcel_smart_bar_header %}\n    <template #smart-bar-header>\n        {% block sw_myparcel_smart_bar_header_title %}\n        <h2>\n            {% block sw_myparcel_smart_bar_header_title_text %}\n            {{ $tc(\'sw-myparcel.general.mainMenuItemGeneral\') }}: {{ $tc(\'sw-myparcel.shipments.title\') }}\n            {% endblock %}\n        </h2>\n        {% endblock %}\n    </template>\n    {% endblock %}\n\n    {% block sw_myparcel_smart_bar_actions %}\n    <template #smart-bar-actions>\n\n    </template>\n    {% endblock %}\n\n    {% block sw_myparcel_content %}\n    <template #content>\n        <sw-grid\n                :items="shipments"\n                :isFullpage="true"\n                :table="true"\n                :sortBy="sortBy"\n                :sortDirection="sortDirection"\n                @sw-grid-select-item="onSelectionChanged"\n                @sw-grid-select-all="onSelectionChanged"\n                @sort-column="onSortColumn">\n            <template slot="columns" slot-scope="{ item }">\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.orderColumn\')" dataIndex="order.orderNumber" :sortable="true">\n                    {{ item.order.orderNumber }}\n                </sw-grid-column>\n\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.orderDateColumn\')" dataIndex="order.orderDateTime" :sortable="true">\n                    {{ item.order.orderDateTime | date({hour: \'2-digit\', minute: \'2-digit\'}) }}\n                </sw-grid-column>\n\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.packageTypeColumn\')">\n                    {{ item.shippingOption.packageType }}\n                </sw-grid-column>\n\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.actionsColumn\')">\n                    <sw-context-button :showMenuOnStartup="false" :menuWidth="220" menuHorizontalAlign="right" menuVerticalAlign="bottom" icon="small-more" :disabled="false" :autoClose="true" :zIndex="9000">\n                        <sw-context-menu-item :disabled="!item.labelUrl" class="sw-myparcel-shipping-options-list__create-shipment-action" @click="onDownloadLabel(item)">\n                            {{ $tc(\'sw-myparcel.orders.buttons.downloadLabel\') }}\n                        </sw-context-menu-item>\n                    </sw-context-button>\n                </sw-grid-column>\n            </template>\n        </sw-grid>\n    </template>\n\n    <template #pagination>\n        <sw-pagination :page="page"\n                       :limit="limit"\n                       :total="total"\n                       :total-visible="7">\n        </sw-pagination>\n    </template>\n    {% endblock %}\n</sw-page>\n{% endblock %}'},dw5Z:function(e,t){e.exports='{% block sw_myparcel_shipments %}\n<sw-page class="sw-myparcel-shipments">\n    {% block sw_myparcel_smart_bar_header %}\n    <template #smart-bar-header>\n        {% block sw_myparcel_smart_bar_header_title %}\n        <h2>\n            {% block sw_myparcel_smart_bar_header_title_text %}\n            {{ $tc(\'sw-myparcel.general.mainMenuItemGeneral\') }}: {{ $tc(\'sw-myparcel.shippingMethods.title\') }}\n            {% endblock %}\n        </h2>\n        {% endblock %}\n    </template>\n    {% endblock %}\n\n    {% block sw_myparcel_smart_bar_actions %}\n<template #smart-bar-actions>\n\n</template>\n    {% endblock %}\n\n    {% block sw_myparcel_content %}\n    <template #content>\n        <sw-grid\n            :items="shippingMethods"\n            :isFullpage="true"\n            :table="true"\n            :sortBy="sortBy"\n            :sortDirection="sortDirection"\n            :selectable="false"\n            @sort-column="onSortColumn">\n\n            <template slot="columns" slot-scope="{ item }">\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.carrierColumn\')" dataIndex="item.carrierName" :sortable="true">\n                    {{ item.carrierName }}\n                </sw-grid-column>\n\n                <sw-grid-column flex="minmax(200px, 1fr)" :label="$tc(\'sw-myparcel.columns.actionsColumn\')">\n                    <sw-context-button :showMenuOnStartup="false" :menuWidth="220" menuHorizontalAlign="right" menuVerticalAlign="bottom" icon="small-more" :disabled="false" :autoClose="true" :zIndex="9000">\n                        <sw-context-menu-item class="sw-myparcel-shipping-method-list__view-shipping-method-action" :routerLink="{ name: \'sw.settings.shipping.detail\', params: { id: item.shippingMethodId } }">\n                            {{ $tc(\'sw-myparcel.orders.buttons.viewShippingMethod\') }}\n                        </sw-context-menu-item>\n                    </sw-context-button>\n                </sw-grid-column>\n            </template>\n        </sw-grid>\n    </template>\n\n    <template #pagination>\n        <sw-pagination :page="page"\n                       :limit="limit"\n                       :total="total"\n                       :total-visible="7">\n        </sw-pagination>\n    </template>\n    {% endblock %}\n</sw-page>\n{% endblock %}'},g4Un:function(e){e.exports=JSON.parse('{"sw-myparcel":{"general":{"mainMenuItemGeneral":"MyParcel","ordersMenuItemGeneral":"Orders","shipmentsMenuItemGeneral":"Shipments","shippingMethodsMenuItemGeneral":"Shipping methods","descriptionTextModule":"Tagline for MyParcel"},"columns":{"orderColumn":"Order","orderDateColumn":"Order date","totalAmountColumn":"Total amount","statusColumn":"Status","actionsColumn":"Actions","packageTypeColumn":"Package type","carrierColumn":"Carrier"},"orders":{"title":"Orders","modals":{"createShipment":{"titleSingle":"Create a shipment","titleMultiple":"Create shipments ({numberOfItems} item(s))","actionTypeDownloadLabel":"Download","actionTypeCreateLabel":"Create consignment","packageTypePackageLabel":"Package","packageTypeMailboxLabel":"Mailbox","packageTypeLetterLabel":"Letter","packageTypeDigitalStampLabel":"Digital stamp","optionOnlyRecipientLabel":"Only recipient","optionRequiresAgeCheckLabel":"Requires age check 18+","optionRequiresSignatureLabel":"Requires signature","optionReturnIfNotHomeLabel":"Return if not home","optionLargePackageLabel":"Large package","positionTopLeftLabel":"Top left","positionTopRightLabel":"Top right","positionBottomLeftLabel":"Bottom left","positionBottomRightLabel":"Bottom right","actionTypeHeading":"Action type","packageTypeHeading":"Package type","numberOfLabelsHeading":"Number of labels","printPositionHeading":"Print position","shippingOptionsHeading":"Shipping options"}},"buttons":{"viewOrder":"View the order","cancelButton":"Cancel","createShipmentButton":"Create shipment","createShipmentsButton":"Create shipments","viewShippingMethod":"View shipping method","downloadLabel":"Download label"},"messages":{"error":"An error has occurred","shipmentSuccess":"The shipment is successfully created"}},"shipments":{"title":"Shipments"},"shippingMethods":{"title":"Shipping methods"}}}')},jn0X:function(e){e.exports=JSON.parse('{"sw-myparcel":{"general":{"mainMenuItemGeneral":"MyParcel","ordersMenuItemGeneral":"Orders","shipmentsMenuItemGeneral":"Shipments","shippingMethodsMenuItemGeneral":"Shipping methods","descriptionTextModule":"Tagline for MyParcel"},"columns":{"orderColumn":"Order","orderDateColumn":"Aankoopdatum","totalAmountColumn":"Totaalbedrag","statusColumn":"Status","actionsColumn":"Acties","packageTypeColumn":"Type pakket","carrierColumn":"Carrier"},"orders":{"title":"Bestellingen","modals":{"createShipment":{"titleSingle":"Maak verzending aan","titleMultiple":"Maak verzendingen aan ({numberOfItems} item(s))","actionTypeDownloadLabel":"Download","actionTypeCreateLabel":"Maak zending","packageTypePackageLabel":"Pakket","packageTypeMailboxLabel":"Brievenbuspakket","packageTypeLetterLabel":"Briefpost","packageTypeDigitalStampLabel":"Digitale postzegel","optionOnlyRecipientLabel":"Alleen thuisadres","optionRequiresAgeCheckLabel":"Controle leeftijd 18+","optionRequiresSignatureLabel":"Handtekening nodig","optionReturnIfNotHomeLabel":"Retour bij niet aanwezig","optionLargePackageLabel":"Groot pakket","positionTopLeftLabel":"Linksboven","positionTopRightLabel":"Rechtsboven","positionBottomLeftLabel":"Linksonder","positionBottomRightLabel":"Rechtsonder","actionTypeHeading":"Type actie","packageTypeHeading":"Type pakket","numberOfLabelsHeading":"Aantal labels","printPositionHeading":"Printpositie","shippingOptionsHeading":"Verzendopties"}},"buttons":{"viewOrder":"Order bekijken","cancelButton":"Annuleren","createShipmentButton":"Verzending aanmaken","createShipmentsButton":"Verzendingen aanmaken","viewShippingMethod":"Bekijk verzendmethod","downloadLabel":"Label downloaden"},"messages":{"error":"Er heeft een fout plaatsgevonden","shipmentSuccess":"De verzending is succesvol aangemaakt"}},"shipments":{"title":"Verzendingen"},"shippingMethods":{"title":"Verzendmethoden"}}}')},u46F:function(e,t){e.exports='{% block sw_settings_content_card_slot_shop %}\n    {% parent %}\n\n    <sw-settings-item :label="$tc(\'sw-myparcel.general.mainMenuItemGeneral\')"\n                      :to="{ name: \'sw.myparcel.index\' }"\n                      :backgroundEnabled="true">\n        <template #icon>\n            <span class="sw-icon sw-icon--fill">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151.549 151.549" class="myparcel-logo">\n                    <g fill="#758ca3" transform="translate(-128 -152)">\n                        <path d="M152.482,273.612a16.466,16.466,0,0,1-8.288-30.7L246.747,183.3a16.464,16.464,0,1,1,16.546,28.47l-102.553,59.6A16.388,16.388,0,0,1,152.482,273.612Z" fill="currentColor"></path>\n                        <path d="M203.93,303.117a16.466,16.466,0,0,1-8.289-30.7l51.277-29.8a16.464,16.464,0,1,1,16.546,28.47l-51.277,29.8A16.383,16.383,0,0,1,203.93,303.117Z" fill="currentColor"></path>\n                        <path d="M152.311,214.3a16.467,16.467,0,0,1-8.289-30.7L195.3,153.8a16.465,16.465,0,0,1,16.548,28.47l-51.276,29.8A16.394,16.394,0,0,1,152.311,214.3Z" fill="currentColor"></path>\n                    </g>\n                </svg>\n            </span>\n        </template>\n    </sw-settings-item>\n{% endblock %}'},w347:function(e){e.exports=JSON.parse('{"sw-myparcel":{"general":{"mainMenuItemGeneral":"MyParcel","ordersMenuItemGeneral":"Orders","shipmentsMenuItemGeneral":"Shipments","shippingMethodsMenuItemGeneral":"Shipping methods","descriptionTextModule":"Tagline for MyParcel"},"columns":{"orderColumn":"Order","orderDateColumn":"Order date","totalAmountColumn":"Total amount","statusColumn":"Status","actionsColumn":"Actions","packageTypeColumn":"Package type","carrierColumn":"Carrier"},"orders":{"title":"Orders","modals":{"createShipment":{"titleSingle":"Create a shipment","titleMultiple":"Create shipments ({numberOfItems} item(s))","actionTypeDownloadLabel":"Download","actionTypeCreateLabel":"Create consignment","packageTypePackageLabel":"Package","packageTypeMailboxLabel":"Mailbox","packageTypeLetterLabel":"Letter","packageTypeDigitalStampLabel":"Digital stamp","optionOnlyRecipientLabel":"Only recipient","optionRequiresAgeCheckLabel":"Requires age check 18+","optionRequiresSignatureLabel":"Requires signature","optionReturnIfNotHomeLabel":"Return if not home","optionLargePackageLabel":"Large package","positionTopLeftLabel":"Top left","positionTopRightLabel":"Top right","positionBottomLeftLabel":"Bottom left","positionBottomRightLabel":"Bottom right","actionTypeHeading":"Action type","packageTypeHeading":"Package type","numberOfLabelsHeading":"Number of labels","printPositionHeading":"Print position","shippingOptionsHeading":"Shipping options"}},"buttons":{"viewOrder":"View the order","cancelButton":"Cancel","createShipmentButton":"Create shipment","createShipmentsButton":"Create shipments","viewShippingMethod":"View shipping method","downloadLabel":"Download label"},"messages":{"error":"An error has occurred","shipmentSuccess":"The shipment is successfully created"}},"shipments":{"title":"Shipments"},"shippingMethods":{"title":"Shipping methods"}}}')}},[["HfHS","runtime"]]]);