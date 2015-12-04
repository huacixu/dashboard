// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import ReplicaSetListController from './replicasetlist_controller';

/** Name of the state. Can be used in, e.g., $state.go method. */
export const stateName = 'replicasets';

/**
 * Configures states for the service view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    controller: ReplicaSetListController,
    controllerAs: 'ctrl',
    url: '/replicasets',
    resolve: {
      replicaSets: resolveReplicaSets,
    },
    templateUrl: 'replicasetlist/replicasetlist.html',
  });
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveReplicaSets($resource) {
  /** @type {!angular.Resource<!backendApi.ReplicaSetList>} */
  let resource = $resource('/api/replicasets');

  return resource.get().$promise;
}